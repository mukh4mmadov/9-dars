import React, { useEffect, useRef, useState } from "react";
import Card from "../components/Card";

function Home() {
  const [token] = useState(localStorage.getItem("token"));
  const [products, setProducts] = useState([]);

  const nameREf = useRef();
  const priceREf = useRef();
  const descRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    fetch("https://auth-rg69.onrender.com/api/products/private/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  function handleDelete(id) {
    let conf = confirm("Rostanham o'chirmoqchimsz");
    if (conf) {
      fetch(`${import.meta.env.VITE_API_URL}/products/private/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.message == "Mahsulot muvaffaqiyatli o'chirildi") {
            let copied = [...products];
            copied ==
              copied.filter((cop) => {
                return cop.id != id;
              });

            setProducts(copied);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleSave(event) {
    event.preventDefault();

    const create = {
      name: nameREf.current.value,
      description: descRef.current.value,
      status: "active",
      price: priceREf.current.value,
      category_id: "2",
    };

    fetch("https://auth-rg69.onrender.com/api/products/private", {
      method: "POST",
      headers: {
        "Content-type": "application.json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(create),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.id) {
          setProducts([...products, data]);
          formRef.current.reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <form className="flex w-1/3 mx-auto mt-7 flex-col gap-5">
        <input
          ref={nameREf}
          className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md p-3 transition duration-300 ease-in-out"
          type="text"
          placeholder="Enter Name..."
        />
        <input
          ref={priceREf}
          className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md p-3 transition duration-300 ease-in-out"
          type="number"
          placeholder="Enter price..."
        />
        <textarea
          ref={descRef}
          className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md p-3 transition duration-300 ease-in-out"
          placeholder="Enter description..."
        ></textarea>

        <button
          onClick={handleSave}
          className="bg-blue-600 rounded-md p-3 text-white transition duration-300 ease-in-out "
        >
          SAVE
        </button>
      </form>
      <div className="cards mt-7 flex flex-wrap gap-5 justify-center">
        {products.length > 0 &&
          products.map(function (product) {
            return (
              <Card
                delFunc={handleDelete}
                key={product.id}
                product={product}
              ></Card>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
