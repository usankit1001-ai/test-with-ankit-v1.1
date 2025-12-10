export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = (import.meta as any).env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = (import.meta as any).env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error('Missing Cloudinary configuration. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.');
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', uploadPreset);

  const resp = await fetch(url, {
    method: 'POST',
    body: fd
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`Cloudinary upload failed: ${resp.status} ${resp.statusText} ${text}`);
  }

  const data = await resp.json();
  if (!data || !data.secure_url) throw new Error('Cloudinary returned no secure_url');
  return data.secure_url as string;
}

export function isCloudinaryConfigured(): boolean {
  return Boolean((import.meta as any).env.VITE_CLOUDINARY_CLOUD_NAME && (import.meta as any).env.VITE_CLOUDINARY_UPLOAD_PRESET);
}
