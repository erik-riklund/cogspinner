import { watch } from 'fs';

/**
 * Options for creating a file system watcher.
 */
interface WatcherOptions 
{
  /**
   * The path to the folder to watch.
   */
  folder: string;

  /**
   * The debounce time in milliseconds. Changes within this time
   * window will be coalesced. Defaults to 50ms.
   */
  debounce?: number;

  /**
   * Whether to recursively watch subdirectories. Defaults to true.
   */
  recursive?: boolean;

  /**
   * The callback function to execute when a file system event occurs.
   */
  callback: WatcherCallback;
}

/**
 * A callback function that is executed when a file system event occurs.
 */
type WatcherCallback = (event: string, filename: string) => void;

/**
 * Creates a file system watcher that monitors a folder for changes.
 *
 * @param options The options for the watcher.
 */
export function createWatcher (options: WatcherOptions): void
{
  const debounceTimeouts: Record<string, any> = {};
  const recursive = options.recursive !== false;

  watch(options.folder, { recursive },
    (event, filename) =>
    {
      if (filename !== null)
      {
        clearTimeout(debounceTimeouts[filename]);
        debounceTimeouts[filename] = setTimeout(
          () => { options.callback(event, filename as string); }, options.debounce || 50
        );
      }
    }
  );
}