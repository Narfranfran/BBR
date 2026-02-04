export const checkPasswordStrength = (password: string): number => {
  let score = 0;
  if (!password) return score;

  // Criterios de fortaleza
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  if (hasMinLength) score++;
  if (hasUppercase) score++;
  if (hasLowercase) score++;
  if (hasNumber) score++;
  if (hasSymbol) score++;

  // Aumentar la puntuación si se cumplen varias condiciones
  if (password.length > 12) score++;

  // Normalizar la puntuación a un máximo de 5
  return Math.min(score, 5);
};
