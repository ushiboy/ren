export type Props = {
  show: boolean;
};

export function LoadingMask({ show }: Props) {
  if (!show) return null;
  return (
    <div
      data-testid="loadingMask"
      className="fixed inset-0 left-0 top-0 z-[100] h-full w-full bg-black bg-opacity-75 opacity-60 transition-opacity"
    >
      <div className="mt-[50vh] flex items-center justify-center">
        <div className="fas fa-circle-notch fa-spin fa-5x">
          <svg
            className="h-8 w-8 animate-spin text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
