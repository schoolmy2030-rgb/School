// Cloudinary config — duh8ssfzv
const CLOUD_NAME = "duh8ssfzv";
const UPLOAD_PRESET = "salb_uploads";
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

export async function uploadToCloudinary(file, onProgress) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "salb_evidence");

  onProgress?.("جارٍ الرفع...");

  const res = await fetch(UPLOAD_URL, { method: "POST", body: formData });
  if (!res.ok) throw new Error("فشل الرفع إلى Cloudinary");
  const data = await res.json();

  return {
    url:       data.secure_url,
    publicId:  data.public_id,
    type:      file.type,
    name:      file.name,
    size:      file.size,
  };
}

export async function deleteFromCloudinary(publicId) {
  // الحذف من Cloudinary يحتاج server-side — نكتفي بحذف السجل من Firestore
  console.log("سيُحذف من Firestore فقط:", publicId);
}
