import { useState } from 'react';
import {
  Box,
  Container,
  Input,
  VStack,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  HStack,
} from '@chakra-ui/react';

interface Building {
  name: string;
  code: string;
}

function App() {
  const [buildings, setBuildings] = useState<Building[]>([
    { name: 'Main Building', code: 'MB001' },
    { name: 'Science Center', code: 'SC002' },
    { name: 'Library', code: 'LB003' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newBuildingName, setNewBuildingName] = useState('');
  const [newBuildingCode, setNewBuildingCode] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredBuildings = buildings.filter((building) =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBuilding = () => {
    if (newBuildingName && newBuildingCode) {
      setBuildings([...buildings, { name: newBuildingName, code: newBuildingCode }]);
      setNewBuildingName('');
      setNewBuildingCode('');
      onClose();
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Building Directory
          </Text>
          <Button colorScheme="blue" onClick={onOpen}>
            Add New Building
          </Button>
        </Box>

        <Box>
          <Input
            placeholder="Search buildings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="lg"
          />
        </Box>

        <VStack spacing={4} align="stretch">
          {filteredBuildings.map((building) => (
            <Box
              key={building.code}
              p={4}
              borderWidth={1}
              borderRadius="md"
              boxShadow="sm"
            >
              <Text fontWeight="bold">{building.name}</Text>
              <Text color="gray.600">Code: {building.code}</Text>
            </Box>
          ))}
        </VStack>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Building</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Building Name</FormLabel>
                <Input
                  value={newBuildingName}
                  onChange={(e) => setNewBuildingName(e.target.value)}
                  placeholder="Enter building name"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Building Code</FormLabel>
                <Input
                  value={newBuildingCode}
                  onChange={(e) => setNewBuildingCode(e.target.value)}
                  placeholder="Enter building code"
                />
              </FormControl>

              <HStack spacing={4} width="100%" justify="flex-end">
                <Button onClick={onClose}>Cancel</Button>
                <Button colorScheme="blue" onClick={handleAddBuilding}>
                  Add Building
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default App; 