const ingresos = [new Ingreso("Salario", 9000), new Ingreso("Venta auto", 400)];
const egresos = [new Egreso("Renta", 900), new Egreso("Internet", 400)];

const d = document;

const totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};

const totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};

const formatoMoneda = (currency) => {
  return currency.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: "2",
  });
};

const formatoPorcentaje = (percentage) => {
  return percentage.toLocaleString("es-MX", {
    style: "percent",
    minimumFractionDigits: "2",
  });
};

const cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();

  d.querySelector("#presupuesto").innerHTML = formatoMoneda(presupuesto);
  d.querySelector("#porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  d.querySelector("#ingresos").innerHTML = formatoMoneda(totalIngresos());
  d.querySelector("#egresos").innerHTML = formatoMoneda(totalEgresos());
};

function cargarApp() {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
}

const cargarIngresos = () => {
  let ingresosHTML = "";
  for (const ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  d.querySelector("#lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
  <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
      <div class="elemento_eliminar">
          <button  class="elemento_eliminar--btn">
              <ion-icon onclick="eliminarIngreso(${
                ingreso.id
              })" name="close-circle-outline" ></ion-icon>
          </button>
      </div>
    </div>
  </div>`;
  return ingresoHTML;
};

const eliminarIngreso = (id) => {
  let indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
  ingresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarIngresos();
};

const cargarEgresos = () => {
  let egresosHTML = "";
  for (const egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }
  d.querySelector("#lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
  let egresoHTML = `
  <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
      <div class="elemento_eliminar">
          <button class="elemento_eliminar--btn">
              <ion-icon onclick="eliminarEgreso(${
                egreso.id
              })" name="close-circle-outline"></ion-icon>
          </button>
      </div>
    </div>
  </div>`;
  return egresoHTML;
};

const eliminarEgreso = (id) => {
  let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
  egresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarEgresos();
};

const agregarDato = () => {
  /* En la variable forma, recupera el formulario con id forma.*/
  tipo = d.getElementById("tipo").value;
  descripcion = d.getElementById("descripcion").value;
  valor = parseFloat(d.getElementById("valor").value);
  if (descripcion != "" && valor != "") {
    if (tipo == "ingreso") {
      ingresos.push(new Ingreso(descripcion, valor));
    } else {
      egresos.push(new Egreso(descripcion, valor));
    }
    cargarApp();
  }
};
