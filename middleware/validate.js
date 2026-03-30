// Centralized validation helper
export function validateRegister(body) {
  const errors = {}
  const { name, email, password, role } = body

  if (!name || name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters'

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = 'A valid email is required'

  if (!password || password.length < 8)
    errors.password = 'Password must be at least 8 characters'
  else if (!/[A-Z]/.test(password))
    errors.password = 'Password must contain at least one uppercase letter'
  else if (!/[0-9]/.test(password))
    errors.password = 'Password must contain at least one number'

  if (role && !['buyer', 'seller'].includes(role))
    errors.role = 'Role must be buyer or seller'

  return errors
}

export function validateLogin(body) {
  const errors = {}
  const { email, password } = body

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = 'A valid email is required'

  if (!password)
    errors.password = 'Password is required'

  return errors
}
