const _privado = new WeakMap();

class Dato {
  constructor(descripcion, valor) {
    const propiedades = {
      _descripcion: descripcion,
      _valor: valor,
    };
    _privado.set(this, { propiedades });
  }

  get descripcion() {
    return _privado.get(this).propiedades["_descripcion"];
  }
  set descripcion(nuevaDescripcion) {
    return (_privado.get(this).propiedades["_descripcion"] = nuevaDescripcion);
  }

  get valor() {
    return _privado.get(this).propiedades["_valor"];
  }
  set valor(nuevoValor) {
    return (_privado.get(this).propiedades["_valor"] = nuevoValor);
  }
}
