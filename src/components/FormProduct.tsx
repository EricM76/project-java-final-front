import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useCallback, useState, useEffect } from "react";
import type { Category } from "../interfaces/Category";
import type { Section } from "../interfaces/Section";
import type { Brand } from "../interfaces/Brand";
import { UseFetchWithoutToken } from "../hooks/useFetch";

interface IProps {
  handleClose: () => void;
  show: boolean;
}

const FormProduct = ({ handleClose, show }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetFormStates = useCallback(() => {
    setIsLoading(false);
    setCategories([]);
    setSections([]);
    setBrands([]);
    setErrors({});
  }, []);

  const getCategories = useCallback(async () => {
    try {
      const categories_db = await UseFetchWithoutToken(
        `categories`,
        "GET",
        null
      );
      setCategories(categories_db);
    } catch (error) {
      alert(error);
    }
  }, []);

  const getSections = useCallback(async () => {
    try {
      const sections_db = await UseFetchWithoutToken(`sections`, "GET", null);
      setSections(sections_db);
    } catch (error) {
      alert(error);
    }
  }, []);

  const getBrands = useCallback(async () => {
    try {
      const brands_db = await UseFetchWithoutToken(`brands`, "GET", null);
      setBrands(brands_db);
    } catch (error) {
      alert(error);
    }
  }, []);

  useEffect(() => {
    getCategories();
    getSections();
    getBrands();
  }, [getCategories, getSections, getBrands]);

  useEffect(() => {
    if (!show) {
      resetFormStates();
    }
  }, [show, resetFormStates]);

    const onCloseModal = () => {
    handleClose(); // Llama a la función handleClose pasada por el padre
    // Los estados se resetearán automáticamente por el `useEffect` cuando `show` cambie a `false`
  };

    const [formData, setFormData] = useState<{
    name: string;
    price: string;
    discount: string;
    sectionId: string;
    brandId: string;
    categoryId: string;
    subcategoryId: string;
    description: string;
    image: File | string;
  }>({
    name: "",
    price: "",
    discount: "",
    sectionId: "",
    brandId: "",
    categoryId: "",
    subcategoryId: "",
    description: "",
    image: "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre del producto es requerido";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "El precio debe ser mayor a 0";
    }

    if (!formData.sectionId) {
      newErrors.sectionId = "Debe seleccionar una sección";
    }

    if (!formData.brandId) {
      newErrors.brandId = "Debe seleccionar una marca";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Debe seleccionar una categoría";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validar el tipo de archivo
      if (!file.type.startsWith("image/")) {
        alert("Por favor seleccione un archivo de imagen válido");
        return;
      }

      // Validar el tamaño (máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("La imagen no debe superar los 2MB");
        return;
      }

      // Crear URL para vista previa
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          image: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log(errors);
      // Aquí podrías agregar alguna notificación de error
      return;
    }

    setIsLoading(true);

    try {
      // Crear FormData para enviar la imagen
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("discount", formData.discount || "0");
      formDataToSend.append("sectionId", formData.sectionId);
      formDataToSend.append("brandId", formData.brandId);
      formDataToSend.append("categoryId", formData.categoryId);
      formDataToSend.append("description", formData.description);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: "POST",
        body: formDataToSend, // Ya no enviamos headers porque FormData los establece automáticamente
      });

      const result = await response.json();

      if (result.success) {
        onCloseModal();
        // Aquí podrías agregar alguna notificación de éxito
      } else {
        alert("Error al crear el producto");
      }
    } catch (error: unknown) {
      alert(
        error instanceof Error ? error.message : "Error al crear el producto"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onCloseModal} size="lg" centered>
      <Modal.Header className="bg-warning" closeButton>
        <Modal.Title>Formulario de creación de productos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="row" onSubmit={handleSubmit}>
          <Form.Group className="col-12 col-lg-6 mb-3">
            <Form.Label>Producto</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nombre del producto"
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-12 col-md-6 col-lg-3 mb-3">
            <Form.Label>Precio del producto:</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-12 col-md-6 col-lg-3 mb-3">
            <Form.Label>Descuento:</Form.Label>
            <Form.Control
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              placeholder="Descuento"
            />
          </Form.Group>

          <Form.Group className="col-12 col-md-4 col-lg-4 mb-3">
            <Form.Label>Sección:</Form.Label>
            <Form.Select
              size="lg"
              name="sectionId"
              value={formData.sectionId}
              onChange={handleInputChange}
              isInvalid={!!errors.sectionId}
            >
              <option value="" hidden>
                Elegí la sección
              </option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.sectionId}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-12 col-md-4 col-lg-4 mb-3">
            <Form.Label>Marca:</Form.Label>
            <Form.Select
              size="lg"
              name="brandId"
              value={formData.brandId}
              onChange={handleInputChange}
              isInvalid={!!errors.brandId}
            >
              <option value="" hidden>
                Elegí la marca
              </option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-12 col-md-4 col-lg-4 mb-3">
            <Form.Label>Categoría:</Form.Label>
            <Form.Select
              size="lg"
              name="categoryId"
              value={formData.categoryId}
              isInvalid={!!errors.categoryId}
              onChange={handleInputChange}
            >
              <option value="" hidden>
                Elegí la categoría
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-12 col-md-6 mb-3">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              as="textarea"
              className="mb-3"
              style={{ resize: "none" }}
              rows={5}
              placeholder="Descripción del producto"
              name="description"
              onChange={handleInputChange}
              value={formData.description}
              isInvalid={!!errors.description}
            ></Form.Control>
            <Form.Group>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                isInvalid={!!errors.image}
                name="image"
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Group>
          <Form.Group className="col-12 col-md-6 mb-3">
            <Form.Label>Imagen:</Form.Label>
            <div
              className="border w-100 rounded d-flex justify-content-center align-items-center p-2 mb-4"
              style={{ height: "130px", background: "#f8f9fa" }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div className="text-muted">Vista previa de la imagen</div>
              )}
            </div>
            <Form.Group className="d-flex justify-content-end gap-3">
              <Button variant="danger" onClick={onCloseModal} size="lg">
                Cancelar
              </Button>
              <Button
                variant="dark"
                onClick={handleSubmit}
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? "Guardando..." : "Guardar producto"}
              </Button>
            </Form.Group>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormProduct;
