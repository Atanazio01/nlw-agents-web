const storageKey = 'voter-id';

function loadVoterId() {
  const stored = localStorage.getItem(storageKey);

  if (stored) {
    return stored;
  }

  const created = crypto.randomUUID();
  localStorage.setItem(storageKey, created);

  return created;
}

export const voterId = loadVoterId();
