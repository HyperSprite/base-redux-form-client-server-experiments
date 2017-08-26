const formValues = [
  {
    contentName: 'userName',
    contentLabel: 'User Name (Public)',
    contentType: 'text',
    contentAlt: '',
    contentOptions: null,
    componentType: 'Input',
  },
  {
    contentName: 'firstname',
    contentLabel: 'First Name',
    contentType: 'text',
    contentAlt: '',
    contentOptions: null,
    componentType: 'Input',
  },
  {
    contentName: 'lastname',
    contentLabel: 'Last Name',
    contentType: 'text',
    contentAlt: '',
    contentOptions: null,
    componentType: 'Input',
  },
  {
    contentName: 'locationPref',
    contentLabel: 'Location Detection',
    contentType: 'checkbox',
    contentOptions: ['Manual', 'Automatic'],
    componentType: 'Input',
  },
  {
    contentName: 'phoneNumbers',
    componentType: 'PhoneNumbers',
    contentOptions: {
      type: [
        'Direct',
        'Main',
        'Mobile',
        'Work',
        'Home',
        'Other',
      ],
    },
  },
  {
    contentName: 'addresses',
    componentType: 'Addresses',
    contentOptions: {
      type: [
        'Home',
        'Office',
        'Other',
      ]
    }
  },
];

export default formValues;
