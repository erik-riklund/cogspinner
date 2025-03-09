let intervalId = null;

const STORAGE_KEY = "autoReloadEnabled";
const LAST_RELOAD_KEY = "lastReload";
const DEV_ENDPOINT = `http://${ window.location.host }/dev`;

const button = document.createElement("button");
button.id = "reloadToggle";
document.body.appendChild(button);

const style = document.createElement("style");
style.textContent = `
  #reloadToggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.3);
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 5px;
    z-index: 1000;
  }
  #reloadToggle:hover {
    background: rgba(0, 0, 0, 1);
  }
`;
document.head.appendChild(style);

if (!localStorage.getItem(LAST_RELOAD_KEY))
{
  localStorage.setItem(LAST_RELOAD_KEY, Date.now());
}

if (localStorage.getItem(STORAGE_KEY) === null)
{
  localStorage.setItem(STORAGE_KEY, "true"); // Default: ON
}

async function checkStatus ()
{
  try
  {
    const result = await fetch(DEV_ENDPOINT);

    if (result.ok)
    {
      const data = await result.json();

      if (data.modified > localStorage.getItem(LAST_RELOAD_KEY))
      {
        localStorage.setItem(LAST_RELOAD_KEY, data.modified);
        location.reload();
      }
    }
  } catch (error)
  {
    console.warn('Failed to check status', error);
  }
}

function startAutoReload ()
{
  if (!intervalId)
    intervalId = setInterval(checkStatus, 500);
}

function stopAutoReload ()
{
  if (intervalId)
  {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function updateButtonText ()
{
  const isEnabled = localStorage.getItem(STORAGE_KEY) === "true";
  button.textContent = `Auto-reload: ${ isEnabled ? "ON" : "OFF" }`;
}

function toggleReloading ()
{
  const isEnabled = localStorage.getItem(STORAGE_KEY) === "true";
  localStorage.setItem(STORAGE_KEY, isEnabled ? "false" : "true");

  if (isEnabled) stopAutoReload(); else startAutoReload();

  updateButtonText();
}

button.addEventListener("click", toggleReloading);
if (localStorage.getItem(STORAGE_KEY) === "true") startAutoReload();

updateButtonText();