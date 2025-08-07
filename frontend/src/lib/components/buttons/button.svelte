<script>
  export let label = "Button";
  export let type = "button";
</script>

<style>
  button {
    background-color: var(--md-sys-color-primary);
    color: var(--md-sys-color-on-primary);
    border: none;
    border-radius: var(--md-sys-shape-corner-medium);
    padding: 10px 16px;
    font-size: var(--md-sys-typescale-label-large-size);
    font-weight: var(--md-sys-typescale-label-large-weight);
    line-height: var(--md-sys-typescale-label-large-lineheight);
    box-shadow: var(--md-sys-elevation-1);
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: #5c42a0; /* más oscuro */
  }

  button:disabled {
    opacity: 0.38;
    cursor: default;
  }
</style>

<button type={type}>
  {label}
</button>
