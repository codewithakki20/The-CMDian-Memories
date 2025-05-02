import React, { useState } from 'react';
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Chip,
  Typography,
} from '@mui/material';
import { Close as CloseIcon, Share as ShareIcon } from '@mui/icons-material';
import { Stack, Button } from '@mui/material';

// Define the dummy memories data
const memories = [
  { id: 1, title: 'College Trip to Parsahi', description: 'Our amazing trip to Parsahi, full of adventure!', imageUrl: '/Parsahi/Parsahi1.jpg', category: 'parsahi' },
  { id: 2, title: 'College Trip to Parsahi', description: 'Our amazing trip to Parsahi, full of adventure!', imageUrl: '/Parsahi/Parsahi2.jpg', category: 'parsahi' },
  { id: 3, title: 'College Trip to Parsahi', description: 'Our amazing trip to Parsahi, full of adventure!', imageUrl: '/Parsahi/Parsahi3.jpg', category: 'parsahi' },
  { id: 4, title: 'College Trip to Parsahi', description: 'Our amazing trip to Parsahi, full of adventure!', imageUrl: '/Parsahi/Parsahi4.jpg', category: 'parsahi' },

  { id: 5, title: 'College Trip to Chaturgarh', description: 'Our amazing trip to Chaturgarh, full of adventure!', imageUrl: '/Chaturgarh/Chaturgarh1.jpg', category: 'chaturgarh' },
  { id: 6, title: 'College Trip to Chaturgarh', description: 'Our amazing trip to Chaturgarh, full of adventure!', imageUrl: '/Chaturgarh/Chaturgarh2.jpg', category: 'chaturgarh' },
  { id: 7, title: 'College Trip to Chaturgarh', description: 'Our amazing trip to Chaturgarh, full of adventure!', imageUrl: '/Chaturgarh/Chaturgarh3.jpg', category: 'chaturgarh' },
  { id: 8, title: 'College Trip to Chaturgarh', description: 'Our amazing trip to Chaturgarh, full of adventure!', imageUrl: '/Chaturgarh/Chaturgarh4.jpg', category: 'chaturgarh' },
  { id: 9, title: 'College Trip to Chaturgarh', description: 'Our amazing trip to Chaturgarh, full of adventure!', imageUrl: '/Chaturgarh/Chaturgarh5.jpg', category: 'chaturgarh' },

  { id: 10, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland1.jpg', category: 'goldenisland' },
  { id: 11, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland2.jpg', category: 'goldenisland' },
  { id: 12, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland3.jpg', category: 'goldenisland' },
  { id: 13, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland4.jpg', category: 'goldenisland' },
  { id: 14, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland5.jpg', category: 'goldenisland' },
  { id: 15, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland6.jpg', category: 'goldenisland' },
  { id: 16, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland7.jpg', category: 'goldenisland' },
  { id: 17, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland8.jpg', category: 'goldenisland' },
  { id: 18, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland9.jpg', category: 'goldenisland' },

  { id: 19, title: 'Last day of college', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Last day/Last day1.jpg', category: 'lastday' },
  { id: 20, title: 'Last day of college', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Last day/Last day2.jpg', category: 'lastday' },
  { id: 21, title: 'Last day of college', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Last day/Last day3.jpg', category: 'lastday' },
  { id: 22, title: 'Last day of college', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Last day/Last day4.jpg', category: 'lastday' },

  { id: 23, title: 'Pre Holi celebration of  collage', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Holi/Holi1.jpg', category: 'holi' },
  { id: 24, title: 'Pre Holi celebration of  collage', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Holi/Holi2.jpg', category: 'holi' },
  { id: 25, title: 'Pre Holi celebration of  collage', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Holi/Holi3.jpg', category: 'holi' },
  { id: 26, title: 'Pre Holi celebration of  collage', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Holi/Holi4.jpg', category: 'holi' },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'events', label: 'Events' },
  { id: 'goldenisland', label: 'Golden Island' },
  { id: 'chaturgarh', label: 'Chaturgarh' },
  { id: 'parsahi', label: 'Parsahi' },
  { id: 'holi', label: 'Holi' },
  { id: 'lastday', label: ' Last Day' },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const filteredMemories = memories.filter(memory =>
    selectedCategory === 'all' ? true : memory.category === selectedCategory
  );

  const handleMemoryClick = (memory) => {
    setSelectedMemory(memory);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMemory(null);
  };

  const handleShare = async () => {
    if (navigator.share && selectedMemory) {
      try {
        await navigator.share({
          title: selectedMemory.title,
          text: selectedMemory.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg" className="py-6">
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" fontWeight="bold" className="text-blue-600">
          📸 CMDians Memories
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" className="mt-1">
          Relive the golden moments of college life!
        </Typography>
      </Box>

      {/* Categories */}
      <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" mb={5}>
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategory(category.id)}
            className={`text-sm md:text-base ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
            sx={{
              borderRadius: '20px',
              fontWeight: 500,
            }}
          >
            {category.label}
          </Button>
        ))}
      </Stack>

      {/* Memories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMemories.map((memory) => (
          <div
            key={memory.id}
            onClick={() => handleMemoryClick(memory)}
            className="cursor-pointer rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={memory.imageUrl}
              alt={memory.title}
              className="w-full h-48 object-cover"
            />
            <Box p={2}>
              <Typography variant="subtitle1" fontWeight="bold" className="truncate">
                {memory.title}
              </Typography>
              <Chip label={memory.category} size="small" className="mt-2 bg-gray-300" />
            </Box>
          </div>
        ))}
      </div>

      {/* Memory Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Memory Details</Typography>
            <Box>
              <IconButton onClick={handleShare}>
                <ShareIcon />
              </IconButton>
              <IconButton onClick={handleCloseDialog}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedMemory && (
            <Box>
              <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}>
                <img
                  src={selectedMemory.imageUrl}
                  alt={selectedMemory.title}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                />
              </Box>
              <Typography variant="h5" className="mt-3">
                {selectedMemory.title}
              </Typography>
              <Typography variant="body2" className="mt-2">
                {selectedMemory.description}
              </Typography>
              <Chip label={selectedMemory.category} sx={{ mt: 2, bgcolor: 'gray.200' }} />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Gallery;
