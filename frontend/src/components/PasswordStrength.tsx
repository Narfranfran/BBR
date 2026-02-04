'use client';

import { checkPasswordStrength } from '@/utils/password';

interface PasswordStrengthProps {
  password?: string;
}

const STRENGTH_LEVELS = [
  { label: 'Muy Débil', color: 'bg-red-700', width: 'w-1/5' },
  { label: 'Débil', color: 'bg-red-500', width: 'w-2/5' },
  { label: 'Buena', color: 'bg-yellow-500', width: 'w-3/5' },
  { label: 'Fuerte', color: 'bg-green-500', width: 'w-4/5' },
  { label: 'Muy Fuerte', color: 'bg-green-700', width: 'w-full' },
];

const PasswordStrength = ({ password = '' }: PasswordStrengthProps) => {
  const score = checkPasswordStrength(password);

  const getStrength = () => {
    if (password.length === 0) return null;
    if (score <= 1) return STRENGTH_LEVELS[0];
    if (score === 2) return STRENGTH_LEVELS[1];
    if (score === 3) return STRENGTH_LEVELS[2];
    if (score === 4) return STRENGTH_LEVELS[3];
    return STRENGTH_LEVELS[4];
  };

  const strength = getStrength();

  return (
    <div className="h-2 bg-neutral-800 border border-white/10 mt-2 relative">
      {strength && (
        <div
          className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`}
        />
      )}
    </div>
  );
};

export default PasswordStrength;
