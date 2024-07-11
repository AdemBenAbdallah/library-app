export const getUploadThingUrl = (fileKey?: string | null) => {
  return fileKey ? `https://utfs.io/f/${fileKey}` : "";
};
export const getAvatarFallbackName = (name?: string | null) => {
  return name ? `${name[0]}${name[1]}`.toUpperCase() : "";
};
