import React from 'react';

import '../css/main.scss';
import logoCartao from '../assets/logo-cartao.svg';

const step = 2;
const totalSteps = 3;

export default function App() {
  return (
    <>
      <section className="checkout">
        <section className="checkout__wrapper">
          <section className="checkout__column checkout__column--display">
            <section className="checkout__row">
              <a href="#/" className="checkout__control checkout__control--desktop">Alterar forma de pagamento</a>
              <a href="#/" className="checkout__control checkout__control--mobile"><strong>Etapa {step}</strong> de {totalSteps}</a>
            </section>
            <section className="checkout__row checkout__row--title">
                <img src={logoCartao} alt="Adicionar cartão"/>
                <h2>Adicione um novo cartão de crédito</h2>
            </section>
            <figure className="checkout__row checkout__row--card">
                <img src="" alt=""/>
            </figure>
          </section>
          <section className="checkout__column checkout__column--information">
            <section className="checkout__row checkout__row--breadcrumb">
              <section className="checkout__step">Carrinho</section>
              <section className="checkout__step">Pagamento</section>
              <section className="checkout__step">Confirmação</section>
            </section>
            <section className="checkout__row checkout__row--form">
              <input type="text" name="cardNumber" id="cardNumber" placeholder="Número do cartão" />
              <input type="text" name="name" id="name" placeholder="Nome completo (igual ao cartão)" />
              <section className="checkout__group">
                <input type="text" name="expiration" id="expiration" placeholder="Validade" />
                <input type="text" name="cvv" id="cvv" placeholder={`CVV ${"icone"}`} />
              </section>
              <select name="installments" id="installments">
                <option value="1x">1x de X</option>
                <option value="2x">2x de X</option>
                <option value="3x">3x de X</option>
                <option value="4x">4x de X</option>
                <option value="5x">5x de X</option>
              </select>
            </section>
            <section className="checkout__row checkout__row--button">
              <button>CONTINUAR</button>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}
