import bcrypt from 'bcryptjs';

const validatePassword = async (password, hashedPassword) => {
  const isValidPassword = await bcrypt.compare(password, hashedPassword);
  return isValidPassword;
};

export default validatePassword;
