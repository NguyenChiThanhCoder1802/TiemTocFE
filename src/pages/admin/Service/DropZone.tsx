import { Box, IconButton, Stack } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import type { ServiceFormData } from './ServiceDialog'; // <-- import type

interface DropZoneProps {
  label: string;
  files: File[];
  field: keyof ServiceFormData; // 🔥 quan trọng
  multiple?: boolean;
  onDrop: (files: File[], field: keyof ServiceFormData) => void;
  onRemove: (index: number, field: keyof ServiceFormData) => void;
}

export default function DropZone({
  label,
  files,
  field,
  multiple = false,
  onDrop,
  onRemove,
}: DropZoneProps) {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles, field);
    },
    [field, onDrop]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    multiple,
  });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <Box>
      {/* Ô upload */}
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed gray',
          borderRadius: 2,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          cursor: 'pointer',
          mb: 1,
        }}
      >
        <input {...getInputProps()} />
        <Add fontSize="large" color="disabled" />
        <Box
          sx={{
            position: 'absolute',
            bottom: 4,
            right: 8,
            fontSize: 12,
            color: 'gray',
          }}
        >
          {label}
        </Box>
      </Box>

      {/* Preview ảnh/video */}
      <Stack direction="row" gap={1} flexWrap="wrap">
        {files.map((file, index) => {
          const url = URL.createObjectURL(file);
          const isImage = file.type.startsWith('image/');
          const isVideo = file.type.startsWith('video/');

          return (
            <Box key={index} sx={{ position: 'relative' }}>
              {isImage ? (
                <img
                  src={url}
                  alt="preview"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                    borderRadius: 4,
                    cursor: 'pointer',
                  }}
                  onClick={() => setLightboxIndex(index)}
                />
              ) : isVideo ? (
                <video
                  src={url}
                  controls
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                    borderRadius: 4,
                  }}
                />
              ) : null}

              {/* Nút xóa */}
              <IconButton
                size="small"
                onClick={() => onRemove(index, field)}
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  bgcolor: 'white',
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          );
        })}
      </Stack>

      {/* Lightbox xem ảnh */}
      {lightboxIndex !== null && (
        <Lightbox
          open
          index={lightboxIndex}
          close={() => setLightboxIndex(null)}
          slides={files.map((f) => ({
            src: URL.createObjectURL(f),
          }))}
        />
      )}
    </Box>
  );
}
