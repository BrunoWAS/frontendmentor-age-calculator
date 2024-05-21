document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.card__form');

  form.addEventListener('submit', function(e) {
      e.preventDefault();

      const day = document.getElementById('day').value;
      const month = document.getElementById('month').value;
      const year = document.getElementById('year').value;
      const calcDay = document.getElementById('calcday');
      const calcMonth = document.getElementById('calcmonth');
      const calcYear = document.getElementById('calcyear');
      
      if (isValidDate(day, month, year)) {
          const result = calcularIdade(day, month, year);
          calcDay.innerHTML = result.dias;
          calcMonth.innerHTML = result.meses;
          calcYear.innerHTML = result.anos;
      } else {
          calcDay.innerHTML = '--';
          calcMonth.innerHTML = '--';
          calcYear.innerHTML = '--';
      }
  });
});

function isValidDate(day, month, year) {
  day = Number(day);
  month = Number(month);
  year = Number(year);

  const dayInput = document.getElementById('day');
  const monthInput = document.getElementById('month');
  const yearInput = document.getElementById('year');
  const dayError = document.getElementById('day-error');
  const monthError = document.getElementById('month-error');
  const yearError = document.getElementById('year-error');
  
  const currentYear = new Date().getFullYear();
  let isValid = true;
  
  if (isNaN(day) || day < 1 || day > 31) {
      dayInput.classList.add('input-error');
      dayError.textContent = "Must be a valid day";
      isValid = false;
  } else {
      dayInput.classList.remove('input-error');
      dayError.textContent = "";
  }

  if (isNaN(month) || month < 1 || month > 12) {
      monthInput.classList.add('input-error');
      monthError.textContent = "Must be a valid month";
      isValid = false;
  } else {
      monthInput.classList.remove('input-error');
      monthError.textContent = "";
  }

  if (isNaN(year) || year < 1900 || year > currentYear) {
      yearInput.classList.add('input-error');
      yearError.textContent = "Must be a valid year";
      isValid = false;
  } else {
      yearInput.classList.remove('input-error');
      yearError.textContent = "";
  }

  if (!isValid) {
      alert("Por favor, insira valores válidos.");
  }

  return isValid;
}

function calcularIdade(day, month, year) {
  const nascimento = new Date(year, month - 1, day);
  const hoje = new Date();
  let idadeAnos = hoje.getFullYear() - nascimento.getFullYear();
  let idadeMeses = hoje.getMonth() - nascimento.getMonth();
  let idadeDias = hoje.getDate() - nascimento.getDate();

  if (idadeDias < 0) {
      idadeMeses--;
      const diasNoMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
      idadeDias += diasNoMesAnterior;
  }

  if (idadeMeses < 0) {
      idadeAnos--;
      idadeMeses += 12;
  }

  return { anos: idadeAnos, meses: idadeMeses, dias: idadeDias };
}
