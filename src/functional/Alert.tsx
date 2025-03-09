interface AlertProps {
  message: string;
  type: string;
}
function Alert({ message, type }: AlertProps) {
  return <div>{message}</div>;
}

export default Alert;
