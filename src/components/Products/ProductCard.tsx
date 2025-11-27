import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Product } from "../../types/Product";

const MotionBox = motion(Box);

interface ProductCardProps {
  product: Product;
  index: number;
  linkPrefix: string;
  onAddToCart?: (id: number) => void;
}

const ProductCard = ({ product, index, linkPrefix, onAddToCart }: ProductCardProps) => {
  return (
    <MotionBox
      key={product.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      sx={{
        flex: {
          xs: "1 1 100%",
          sm: "1 1 calc(50% - 24px)",
          md: "1 1 calc(25% - 24px)",
        },
        maxWidth: {
          sm: "calc(50% - 24px)",
          md: "calc(25% - 24px)",
        },
        mb: 3,
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 4,
          transition: "transform 0.3s",
          "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Link
          to={`/${linkPrefix}/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardMedia
            component="img"
            image={product.imageUrl || "/placeholder.png"}
            alt={product.name}
            sx={{
              width: "100%",
              height: 200,
              objectFit: "cover",
            }}
          />
        </Link>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap textAlign="center">
            {product.name}
          </Typography>

          {product.description && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {product.description}
            </Typography>
          )}

          <Typography
            variant="subtitle1"
            color="error"
            textAlign="center"
            sx={{ mt: 1 }}
          >
            {new Intl.NumberFormat("vi-VN").format(product.price ?? 0)}đ
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => onAddToCart?.(product.id)}
            fullWidth
          >
            Thêm vào giỏ
          </Button>
        </CardActions>
      </Card>
    </MotionBox>
  );
};

export default ProductCard;
