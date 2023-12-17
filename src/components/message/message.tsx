export interface AlertMessageProps {
  type: MessageTypes | null;
  message: string | null;
}

export type MessageTypes = "error" | "success";

export const AlertMessage = (props: AlertMessageProps) => {
  return props.type == "error" ? (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span>{props.message}</span>
    </div>
  ) : (
    <div
      className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-200 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      <span>{props.message}</span>
    </div>
  );
};
