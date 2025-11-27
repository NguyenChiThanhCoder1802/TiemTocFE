import { Box, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import type { Product } from "../../types/Product";

interface ProductListProps {
  items: Product[];
  title?: string;
  linkPrefix: string;
  showActionButton?: boolean;
  actionLabel?: string;
  onActionClick?: (productId: number) => void;
}

const ProductList = ({
  items,
  title,
  linkPrefix,
  showActionButton = false,
  
  onActionClick,
}: ProductListProps) => {
  return (
    <Box>
      {title && (
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
        >
          {title}
        </Typography>
      )}

      <Box display="flex" flexWrap="wrap" gap={3} justifyContent="flex-start">
        {items.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            linkPrefix={linkPrefix}
            onAddToCart={showActionButton ? onActionClick : undefined}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductList;
