import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { userRequest, publicRequest } from "../requestMethods";
import axios from "axios";
const popularProducts = [
  {
    id: 1,
    img: "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
  },
  {
    id: 2,
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRlTCAab_Iug7MfjsvFgZTY9I4c1BfRYwkHn68sWuDp4q2o1tOgRrHMQg_Zdzr-ZrfvJpCuCE6SN6I1Se9OGYiJ6ke60riNJnMbOitM8_fppVP_m5yqoqje&usqp=CAc",
  },
  {
    id: 3,
    img: "https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
  },
  {
    id: 4,
    img: "https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png",
  },
  {
    id: 5,
    img: "https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
  },
  {
    id: 6,
    img: "https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png",
  },
  {
    id: 7,
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRvnyhneWTEnIW71R9dnr0VbGRfzkSm-wuWmMwgNyf-YFyOgwSNPUXEUFSyVeQpiNpF2Ev8Dxfm5yc&usqp=CAc",
  },
  {
    id: 8,
    img: "https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png",
  },
];

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
// const acessToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzQzMGRiYWM2MjVmMGMwYzJlODBhZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Nzc4NTYxMiwiZXhwIjoxNjU5NTEzNjEyfQ.D3vpOke-VQXbTxMJyslgYSYWKugTqvrouSZaTNZDLWg";
// const apiUrl = "http://localhost:5000/api";
// axios.interceptors.request.use(
//   (config) => {
//     config.headers.token = `Bearer ${acessToken}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// const publicRequest = axios.create({
//   baseURL: apiUrl,
// });

// const authAxios = axios.create({
//   baseURL: apiUrl,
//   headers: {
//     token: `Bearer ${acessToken}`,
//   },
// });
const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : `http://localhost:5000/api/products`
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filterProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
