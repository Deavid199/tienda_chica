import React from "react";

export default function Ubicacion() {
  return (
    <>
      <section className="w-full px-16 mx-auto py-12 bg-gray-300">
        <h3 className="mb-6 font-bold text-center text-2xl md:text-4xl md:mb-4 leading-10">
          Ubicación
        </h3>
        <div className="md:flex md:justify-between">
          <div className="text-center w-full lg:w-1/2 text-xl mt-10">
            <p>Bartolomé Mitre 76 - Puerto Madryn</p>
            <p>Telefono</p>
          </div>
          <div className="text-center w-full lg:w-1/2 mt-6 lg:mt-0">
            <h3 className="font-semibold lg:font-bold text-center mb-3 text-2xl md:text-4xl">
              Horarios
            </h3>
            <div className="flex justify-between">
              <p className="w-6/12 text-center text-xl">
                Lunes a Viernes <br /> 9:00 am a 1:00 pm <br /> 4:30 pm a 9:00
                pm
              </p>
              <p className="w-6/12 text-center text-xl">
                Sabados y Feriados <br /> 10:00 am a 1:00 pm <br /> 5 pm a 9:00
                pm
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-x-hidden mb-5">
        <iframe
          className="w-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2929.0907427252814!2d-65.03949042447844!3d-42.76528613291099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbe024a9cd3e10675%3A0x66a2aebd6ef9d7ec!2sBartolom%C3%A9%20Mitre%2076%2C%20U9120%20Puerto%20Madryn%2C%20Chubut!5e0!3m2!1ses!2sar!4v1683147248089!5m2!1ses!2sar"
          width="1600"
          height="550"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </>
  );
}
