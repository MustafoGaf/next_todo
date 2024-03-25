import clsx from 'clsx';
type ButtonType = {
  status?: boolean;
  textTrue?: string;
  textFalse?: string;
};
export default function Button({ status, textFalse, textTrue }: ButtonType) {
  return (
    <button
      disabled={status}
      type="submit"
      className={clsx(
        'mt-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700',
        {
          'cursor-wait bg-[#b7bec5] text-black hover:bg-[#979ea5]':
            status == true,
        },
      )}
    >
      {status ? 'Подождите...' : 'Войти'}
    </button>
  );
}
