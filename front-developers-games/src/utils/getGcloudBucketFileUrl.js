export default function getGcloudBucketFileUrl(filename) {
  if (!filename) {
    return 'https://storage.googleapis.com/developer-games-bucket/avatar-icon.svg';
  }
  return `https://storage.googleapis.com/developer-games-bucket/${filename}`;
}
