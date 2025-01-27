import { Button } from '../ui/button'

export function CounterButton({
  handleIncrement,
  itemCounter = 0,
  handleDecrement,
}) {
  return (
    <>
      <div className="flex h-12 w-full items-center justify-center gap-4 space-x-6 rounded-lg bg-slate-100 dark:bg-slate-700">
        <Button
          variant="opacity"
          className="text-realorange hover:text-orange-600 dark:hover:text-orange-400"
          onClick={handleDecrement}
        >
          -
        </Button>
        <span className="text-gray-900 dark:text-gray-100">{itemCounter}</span>
        <Button
          variant="opacity"
          className="text-realorange hover:text-orange-600 dark:hover:text-orange-400"
          onClick={handleIncrement}
        >
          +
        </Button>
      </div>
    </>
  )
}
