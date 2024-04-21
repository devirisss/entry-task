<script lang="ts">
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  let currencies: string[] = [];
  let fromCurrency: string = "";
  let toCurrency: string = "";
  let amountFrom: number = 1;
  let amountTo: number = 0;

  async function fetchCurrencies(): Promise<void> {
    const response = await fetch(
      "https://v6.exchangerate-api.com/v6/3ba5b1190f2a56cc8d4fbe4a/latest/USD",
    );
    const data = await response.json();
    currencies = Object.keys(data.conversion_rates);
    fromCurrency = "USD";
    toCurrency = currencies[0];
  }

  async function convertFrom(): Promise<void> {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/3ba5b1190f2a56cc8d4fbe4a/pair/${fromCurrency}/${toCurrency}/${amountFrom}`,
    );
    const data = await response.json();
    amountTo = data.conversion_result;
  }

  async function convertTo(): Promise<void> {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/3ba5b1190f2a56cc8d4fbe4a/pair/${toCurrency}/${fromCurrency}/${amountTo}`,
    );
    const data = await response.json();
    amountFrom = data.conversion_result;
  }

  onMount(fetchCurrencies);

  const dispatch = createEventDispatcher();

  function handleAmountFromInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    amountFrom = parseFloat(inputElement.value);
    convertFrom();
  }

  function handleAmountToInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    amountTo = parseFloat(inputElement.value);
    convertTo();
  }

  function handleFromCurrencyChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    fromCurrency = selectElement.value;
    convertFrom();
  }

  function handleToCurrencyChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    toCurrency = selectElement.value;
    convertFrom();
  }
</script>

<main>
  <h1>Currency Converter</h1>
  <div>
    <div>
      <label for="fromCurrency">From:</label>
      <select
        id="fromCurrency"
        bind:value={fromCurrency}
        on:change={handleFromCurrencyChange}
      >
        {#each currencies as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
      <input
        type="number"
        min="0"
        step="any"
        bind:value={amountFrom}
        on:input={handleAmountFromInput}
      />
    </div>
    <div>
      <label for="toCurrency">To:</label>
      <select
        id="toCurrency"
        bind:value={toCurrency}
        on:change={handleToCurrencyChange}
      >
        {#each currencies as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
      <input
        type="number"
        min="0"
        step="any"
        bind:value={amountTo}
        on:input={handleAmountToInput}
      />
    </div>
  </div>
</main>
