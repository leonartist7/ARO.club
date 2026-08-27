/**
 * Share utilities for generating social media share URLs
 */

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

/**
 * Generate Facebook share URL
 */
export const getFacebookShareUrl = (url) => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
};

/**
 * Generate Twitter share URL
 */
export const getTwitterShareUrl = (text, url) => {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
};

/**
 * Generate WhatsApp share URL
 */
export const getWhatsAppShareUrl = (text) => {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
};

/**
 * Generate Email share URL
 */
export const getEmailShareUrl = (subject, body) => {
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

/**
 * Generate share text for an experience
 */
export const getExperienceShareText = (experience, city, language) => {
  return `Check out this ${language?.name} experience in ${city?.name} on ARO! "${experience.title}"`;
};

/**
 * Generate share text for a teacher profile
 */
export const getTeacherShareText = (teacher, language) => {
  return `Meet ${teacher.name}, a ${language?.name} teacher on ARO!`;
};

/**
 * Open share URL in new window
 */
export const openShareWindow = (url, width = 600, height = 400) => {
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  window.open(
    url,
    'share',
    `width=${width},height=${height},left=${left},top=${top},toolbar=0,status=0`
  );
};
