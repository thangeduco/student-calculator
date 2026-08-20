/**
 * Application shell.
 *
 * DEV-01 intentionally renders nothing beyond the shell. The calculator screen — inputs, the
 * "Tính" action, validation messages, result and error states — is owned by DEV-05 to DEV-08
 * (Architecture §4, Screen Map S01).
 */

export function App() {
  return (
    <main>
      <h1>Student Calculator</h1>
    </main>
  );
}
