import imageCompression from "browser-image-compression"

export default async function compressImage(imageFile) {
  if (!(imageFile instanceof Blob)) return null

  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 4000,
    useWebWorker: true,
  }
  try {
    const compressedFile = await imageCompression(imageFile, options)
    return compressedFile
  } catch (error) {
    console.log(error)
  }
}
