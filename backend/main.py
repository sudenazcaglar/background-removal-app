from io import BytesIO

import cv2
import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse


MAX_IMAGE_SIZE = 900
GRABCUT_ITERATIONS = 5
RECT_MARGIN_RATIO = 0.08

app = FastAPI(title="GrabCut Background Remover")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


def resize_to_max_dimension(image: np.ndarray, max_size: int = MAX_IMAGE_SIZE) -> np.ndarray:
    height, width = image.shape[:2]
    largest_side = max(height, width)

    if largest_side <= max_size:
        return image

    scale = max_size / largest_side
    new_width = int(width * scale)
    new_height = int(height * scale)
    return cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_AREA)


def remove_background_with_grabcut(image_bytes: bytes) -> bytes:
    buffer = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(buffer, cv2.IMREAD_COLOR)

    if image is None:
        raise ValueError("Görsel okunamadı. Lütfen geçerli bir JPG, PNG veya WEBP dosyası yükleyin.")

    image = resize_to_max_dimension(image)
    height, width = image.shape[:2]

    if width < 20 or height < 20:
        raise ValueError("Görsel GrabCut için çok küçük. Lütfen daha büyük bir görsel yükleyin.")

    margin_x = max(1, int(width * RECT_MARGIN_RATIO))
    margin_y = max(1, int(height * RECT_MARGIN_RATIO))
    rect = (
        margin_x,
        margin_y,
        max(1, width - (2 * margin_x)),
        max(1, height - (2 * margin_y)),
    )

    mask = np.zeros((height, width), np.uint8)
    bgd_model = np.zeros((1, 65), np.float64)
    fgd_model = np.zeros((1, 65), np.float64)

    # GrabCut, kenarlardan içeri alınmış başlangıç dikdörtgeniyle nesne/arka plan maskesi üretir.
    cv2.grabCut(
        image,
        mask,
        rect,
        bgd_model,
        fgd_model,
        GRABCUT_ITERATIONS,
        cv2.GC_INIT_WITH_RECT,
    )

    foreground_mask = np.where(
        (mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD),
        255,
        0,
    ).astype("uint8")

    result = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)
    result[:, :, 3] = foreground_mask

    success, encoded = cv2.imencode(".png", result)
    if not success:
        raise ValueError("PNG çıktısı oluşturulamadı.")

    return encoded.tobytes()


@app.post("/remove-background")
async def remove_background(image: UploadFile = File(...)) -> StreamingResponse:
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Lütfen multipart/form-data ile bir image dosyası gönderin.")

    try:
        image_bytes = await image.read()
        if not image_bytes:
            raise ValueError("Yüklenen görsel boş görünüyor.")

        png_bytes = remove_background_with_grabcut(image_bytes)
        return StreamingResponse(BytesIO(png_bytes), media_type="image/png")
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except cv2.error as exc:
        raise HTTPException(status_code=422, detail=f"OpenCV GrabCut işlemi başarısız oldu: {exc}") from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Beklenmeyen bir hata oluştu.") from exc
