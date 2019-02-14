const orders = [
    {
    'active': false,
    'checked': false,
    'disabled': false,
    'inputName': 'filter-by-group',
    'inputValue': 'All',
    'label': 'All',
    'separator': false,
    'type': 'radio'
    },
    {
    'active': false,
    'checked': false,
    'disabled': false,
    'inputName': 'filter-by-group',
    'inputValue': 'Title',
    'label': 'Title',
    'separator': false,
    'type': 'radio'
    },
    {
    'active': false,
    'checked': false,
    'disabled': false,
    'inputName': 'filter-by-group',
    'inputValue': 'Author',
    'label': 'Author',
    'separator': false,
    'type': 'radio'
    },
]

const FilterDropDownList = 
[
    {
        'items': [
            {
                'active': true,
                'label': 'Selected Option',
                'inputValue': '1',
                'inputName': 'item1checkbox',
                'type': 'checkbox'
            },
            {
                'label': 'Normal Option',
                'inputValue': '2',
                'inputName': 'item2checkbox',
                'type': 'checkbox'
            },
            {
                'disabled': true,
                'label': 'Disabled Option',
                'inputName': 'item3checkbox',
                'inputValue': '3',
                'type': 'checkbox'
            }
        ],
        'label': 'Collision',
        'searchable': true,
        'type': 'group'
    },
    {
        'items': [
            {
                'checked': true,
                'label': 'Selected Option',
                'inputValue': '1',
                'type': 'checkbox',
                'inputName': 'item1radio',
            },
            {
                'label': 'Normal Option',
                'inputValue': '2',
                'type': 'checkbox',
                'inputName': 'item2radio',
            },
            {
                'disabled': true,
                'label': 'Disabled Option',
                'inputValue': '3',
                'type': 'checkbox',
                'inputName': 'item3radio',
            }
        ],
        'label': 'Order by',
        'searchable': true,
        'type': 'User'
    },
    {
        'items': [
            {
                'active': true,
                'label': 'Selected Option',
                'inputValue': '1',
                'inputName': 'item1checkbox',
                'type': 'checkbox'
            },
            {
                'label': 'Normal Option',
                'inputValue': '2',
                'inputName': 'item2checkbox',
                'type': 'checkbox'
            },
            {
                'disabled': true,
                'label': 'Disabled Option',
                'inputName': 'item3checkbox',
                'inputValue': '3',
                'type': 'checkbox'
            }
        ],
        'label': 'Sites',
        'searchable': true,
        'type': 'group'
    },
    {
        'items': [
            {
                'active': true,
                'label': 'Selected Option',
                'inputValue': '1',
                'inputName': 'item1checkbox',
                'type': 'checkbox'
            },
            {
                'label': 'Normal Option',
                'inputValue': '2',
                'inputName': 'item2checkbox',
                'type': 'checkbox'
            },
            {
                'disabled': true,
                'label': 'Disabled Option',
                'inputName': 'item3checkbox',
                'inputValue': '3',
                'type': 'checkbox'
            }
        ],
        'label': 'Content Type',
        'searchable': true,
        'type': 'group'
    },
    {
        'items': [
            {
                'active': true,
                'label': 'Selected Option',
                'inputValue': '1',
                'inputName': 'item1checkbox',
                'type': 'checkbox'
            },
            {
                'label': 'Normal Option',
                'inputValue': '2',
                'inputName': 'item2checkbox',
                'type': 'checkbox'
            },
            {
                'disabled': true,
                'label': 'Disabled Option',
                'inputName': 'item3checkbox',
                'inputValue': '3',
                'type': 'checkbox'
            }
        ],
        'label': 'Change type',
        'searchable': true,
        'type': 'group'
    }
]

export {
    orders,
    FilterDropDownList,
};