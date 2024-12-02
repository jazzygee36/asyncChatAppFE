'use client';
import Plus from '@/assets/icons/plus';
import { useState, useEffect } from 'react';
import Modal from '../modal';
import { contacts } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import { useThemeContext } from '../context/userContext';

type Contact = {
  id: string;
  username: string;
  email: string;
  avatar?: string; // Optional avatar URL
};

const NewDirectMessage = () => {
  const { setSelectedChatType, setSelectedChatData } = useThemeContext();
  // const { setSelectedChatType, setSelectedChatData } = createChatSlice();
  const [searchedContacts, setSearchedContacts] = useState<Contact[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300); // Debounce for 300ms

  const {
    mutate: searchContacts,
    isPending: isSearching,
    isError: isSearchError,
  } = useMutation({
    mutationFn: contacts,
    onSuccess: (data) => {
      const userContacts = data?.contacts || [];
      setSearchedContacts(userContacts);
      console.log('Search successful:', userContacts); // Debugging log
    },
    onError: (error) => {
      console.error('Error searching contacts:', error);
      setSearchedContacts([]); // Optional: clear results if error occurs
    },
  });

  // Trigger search when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      searchContacts({ searchTerm: debouncedSearchTerm.trim() });
    } else {
      setSearchedContacts([]); // Clear results if input is empty
    }
  }, [debouncedSearchTerm, searchContacts]);

  const handleSearch = (term: string) => {
    setSearchTerm(term); // Only update search term
  };

  const selectNewContact = (contact: Contact) => {
    setIsOpen(false);
    setSearchTerm('');
    setSelectedChatType('contact');
    setSelectedChatData(contact);
    setSearchedContacts([]);
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)} className='cursor-pointer'>
        <Plus />
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <>
          <h4 className='text-center font-bold '>Please select a contact</h4>
          <input
            type='text'
            placeholder='Search contact'
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className='p-3 rounded-lg w-full bg-[#262e3b] text-white mt-4 '
          />
          {isSearching && (
            <div className='text-center text-sm text-gray-500 my-5'>
              Searching...
            </div>
          )}
          {isSearchError && (
            <div className='text-center text-sm text-red-500 my-5'>
              Failed to fetch contacts
            </div>
          )}
          {searchedContacts.length === 0 && !isSearching && !isSearchError && (
            <div className='text-center text-black mt-5'>No contacts found</div>
          )}
          {searchedContacts.length > 0 &&
            searchedContacts.map((contact) => (
              <li
                key={contact.id}
                className='flex items-center gap-3 py-3 cursor-pointer'
                onClick={() => selectNewContact(contact)}
              >
                {contact.avatar ? (
                  <img
                    src={contact.avatar}
                    alt='User Avatar'
                    className='w-12 h-12 rounded-full object-cover'
                  />
                ) : (
                  <div className='w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-black font-bold'>
                    {contact.username ? contact.username[0].toUpperCase() : 'i'}
                  </div>
                )}
                <div className='flex flex-col'>
                  <span className='capitalize'>{contact?.username}</span>
                  <span className='text-xs'>{contact?.email}</span>
                </div>
              </li>
            ))}
        </>
      </Modal>
    </>
  );
};

export default NewDirectMessage;
