const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dm3j4u2pn/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_upload';

export const uploadImageToCloudinary = async (imageUri: string): Promise<string> => {
  const formData = new FormData();

  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  } as any);

  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(CLOUDINARY_URL, {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || 'Error al subir la imagen a Cloudinary');
  }

  return result.secure_url;
};