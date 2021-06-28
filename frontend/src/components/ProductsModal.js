import { useState, useEffect, Fragment } from "react";
import MotoInput from "./MotoInput";
import MotoSelect from "./MotoSelect";
import Pagination from "./Pagination";
import TyreCard from "./TyreCard";

import FiltersModal from "./Modals/FiltersModal";
import AddTyreModal from "./Modals/AddTyreModal";
import AddBrandModal from "./Modals/AddBrandModal";

import axios from "axios";

function isWhole(value) {
  if (value % 1 === 0) return true;
  else return false;
}

const ApiUrl = "http://localhost:2995";

const ProductsModal = () => {
  const [Tyres, setTyres] = useState([]);
  const [filteredTyres, setFilteredTyres] = useState([]);
  const [searchFilters, setFilters] = useState({});

  const [pagination, setPagination] = useState({
    origin: 1,
    current: 1,
    maxView: 3,
    maxPage: 5,
    needsRestart: true,
  });

  const [pageLimit, setPageLimit] = useState(5);

  const [Brands, setBrands] = useState({});
  const [modals, setModals] = useState({
    tyre: false,
    brand: false,
    filter: false,
  });

  const modalVisibility = (modalName, visible) => {
    setModals({ ...modals, [modalName]: visible });
  };

  const [redoFilters, mustApplyFilters] = useState(false);

  const resetPagination = () => {
    setPagination({ ...pagination, needsRestart: true });
  };

  if (pagination.needsRestart) {
    let newLimit = Math.floor(filteredTyres.length / pageLimit);
    setPagination({
      ...pagination,
      origin: 1,
      current: 1,
      maxView: 3,
      maxPage: isWhole(filteredTyres.length / pageLimit)
        ? newLimit
        : newLimit + 1,
      needsRestart: false,
    });
  }

  const changePageLimit = (pageLimit) => {
    setPageLimit(parseInt(pageLimit));
    resetPagination();
  };

  const changePage = (newPage) => {
    setPagination({ ...pagination, current: newPage });
  };

  const nextPage = () => {
    if (pagination.current === pagination.maxPage) return;

    let paginationUpdate = { ...pagination };
    if (pagination.current === pagination.maxView) paginationUpdate.origin++;
    paginationUpdate.current++;

    setPagination(paginationUpdate);
  };

  const previousPage = () => {
    if (pagination.current === 1) return;

    let paginationUpdate = { ...pagination };
    if (pagination.current === pagination.origin) paginationUpdate.origin--;
    paginationUpdate.current--;

    setPagination(paginationUpdate);
  };

  const applyFilters = () => {
    var brand = searchFilters.brand !== "All" ? searchFilters.brand : undefined;
    var size = searchFilters.size !== "All" ? searchFilters.size : undefined;

    if (!brand && !size) {
      setFilteredTyres(Tyres);
      resetPagination();
      return;
    }

    let toMatch = (brand !== undefined) + (size !== undefined);

    var filtered = Tyres.filter((tyre) => {
      let matched = 0;
      if (brand && tyre.brand && tyre.brand === brand) matched++;
      if (size && tyre.size && tyre.size.toUpperCase() === size.toUpperCase())
        matched++;

      return matched === toMatch;
    });

    setFilteredTyres(filtered);
    resetPagination();
  };

  if (redoFilters) {
    applyFilters();
    mustApplyFilters(false);
  }

  const searchFilter = (searchValue) => {
    if (searchValue !== "") {
      // Search by title
      var filtered = [];
      Tyres.forEach((tyre) => {
        // Filter title
        if (
          tyre.title &&
          tyre.title.toUpperCase().includes(searchValue.toUpperCase())
        ) {
          filtered.push(tyre);
          return;
        }

        if (
          tyre.size &&
          tyre.size.toUpperCase().includes(searchValue.toUpperCase())
        ) {
          filtered.push(tyre);
          return;
        }
      });

      setFilteredTyres(filtered);
      resetPagination();
    } else {
      // Reset
      mustApplyFilters(true);
    }
  };

  const updateFilters = (filters) => {
    setFilters(filters);
    mustApplyFilters(true);
  };

  const addTyre = (tyreData) => {
    axios.post(ApiUrl + "/addtyre", tyreData).then((r) => {
      const response = r.data;
      if (!response.error) {
        setTyres(response.data);
        mustApplyFilters(true);
      }
    });
  };

  const prepareBrands = (brands) => {
    const brandsDictionary = {};

    brands.forEach((b) => {
      brandsDictionary[b._id] = b;
    });

    setBrands(brandsDictionary);
  };

  const addBrand = (brandData) => {
    axios.post(ApiUrl + "/addbrand", brandData).then((r) => {
      const response = r.data;
      if (!response.error) {
        prepareBrands(response.data);
      }
    });
  };

  const getBrands = async () => {
    axios.get(ApiUrl + "/brands").then((e) => {
      const response = e.data;
      if (!response.error) {
        prepareBrands(response.data);
      }
    });
  };

  const getTyres = async () => {
    axios.get(ApiUrl + "/tyres").then((e) => {
      let response = e.data;
      if (!response.error) {
        setTyres(response.data);
        setFilteredTyres(response.data);
        resetPagination();
      }
    });
  };

  useEffect(() => {
    async function fetchData() {
      await getBrands();
      await getTyres();
    }
    fetchData();
  }, []);

  var brandFilter = [{ value: null, label: "All" }];
  Object.keys(Brands).forEach((k) =>
    brandFilter.push({ value: Brands[k]._id, label: Brands[k].title })
  );

  return (
    <div className="app">
      <div className="flex column">
        <MotoInput
          placeholder="Search Title Or Size"
          className="mr10 pv15 ph15"
          onChange={searchFilter}
        />
      </div>
      <div className="product-modal">
        <div className="modalHeader">
          <div className="justify-between w100">
            <div className="flex row">
              <div
                className="btn success mr5 font18"
                onClick={() => modalVisibility("tyre", true)}
              >
                Add Tyre
              </div>
              <div
                className="btn success mr5 font18"
                onClick={() => modalVisibility("brand", true)}
              >
                Add Brand
              </div>
              <div
                className="btn dark mr5 font18"
                onClick={() => modalVisibility("filter", true)}
              >
                Filters
              </div>
            </div>
            <div className="flex row">
              <div className="font22 mr10 flex center">Items Per Page</div>
              <MotoSelect
                className="flex center ml10"
                options={[
                  { value: 5, label: "5 Items" },
                  { value: 10, label: "10 Items" },
                  { value: 15, label: "15 Items" },
                  { value: 30, label: "30 Items" },
                  { value: 50, label: "50 Items" },
                ]}
                onSelected={changePageLimit}
              />
            </div>
          </div>
        </div>
        <div className="modalBody">
          <div className="autoContainer">
            {(() => {
              const start =
                pagination.current <= 1
                  ? 0
                  : pageLimit * (pagination.current - 1);
              const end = start + pageLimit;

              return filteredTyres.slice(start, end).map((tyre, i) => {
                return (
                  <TyreCard
                    key={i}
                    title={tyre.title}
                    size={tyre.size}
                    price={tyre.price}
                    image={tyre.image_url}
                    brandLogo={
                      tyre.brand && Brands[tyre.brand]
                        ? Brands[tyre.brand].logo_url
                        : null
                    }
                  />
                );
              });
            })()}
          </div>
        </div>
        <div className="modalFooter">
          <Pagination
            origin={pagination.origin}
            current={pagination.current}
            maxPage={pagination.maxPage}
            maxView={pagination.maxView}
            previous={previousPage}
            next={nextPage}
            change={changePage}
          />
        </div>
      </div>

      <AddBrandModal
        isOpened={modals.brand}
        setVisibility={modalVisibility}
        onUpdate={addBrand}
      />

      <AddTyreModal
        isOpened={modals.tyre}
        brands={Brands}
        setVisibility={modalVisibility}
        onUpdate={addTyre}
      />

      <FiltersModal
        isOpened={modals.filter}
        tyres={Tyres}
        brands={Brands}
        setVisibility={modalVisibility}
        onUpdate={updateFilters}
      />
    </div>
  );
};

export default ProductsModal;
