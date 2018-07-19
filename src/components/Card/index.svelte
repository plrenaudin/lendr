<section class="card {className}">
  <slot></slot>
</section>

<style>
  @import "../../styles/variables.css";

  .card {
    box-shadow: 0 1px 3px var(--shadowColor);
  }
</style>