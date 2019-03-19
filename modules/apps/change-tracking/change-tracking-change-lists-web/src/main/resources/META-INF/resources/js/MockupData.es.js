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

const filterDropdownList = 
[
    {
        'items': [
            {
                'active': true,
                'checked': false,
                'label': 'Selected Option1',
                'inputValue': '01',
                'inputName': 'item1checkbox',
                'type': 'checkbox'
            },
            {
                'checked': false,
                'label': 'Normal Option1',
                'inputValue': '02',
                'inputName': 'item2checkbox',
                'type': 'checkbox'
            },
            {
                'checked': false,
                'disabled': true,
                'label': 'Disabled Option1',
                'inputName': 'item3checkbox',
                'inputValue': '03',
                'type': 'checkbox'
            }
        ],
        'label': 'Collision',
        'inputName': 'collision',
        'searchable': true,
        'type': 'group'
    },
    {
        'items': [
            {
                'checked': true,
                'label': 'Selected Option2',
                'inputValue': '21',
                'type': 'checkbox',
                'inputName': 'item1radio',
            },
            {
                'checked': false,
                'label': 'Normal Option2',
                'inputValue': '22',
                'type': 'checkbox',
                'inputName': 'item2radio',
            },
            {
                'checked': false,
                'disabled': true,
                'label': 'Disabled Option2',
                'inputValue': '23',
                'type': 'checkbox',
                'inputName': 'item3radio',
            }
        ],
        'label': 'User',
        'inputName': 'user',
        'searchable': true,
        'type': 'User'
    },
    {
        'items': [
            {
                'active': true,
                'checked': false,
                'label': 'Selected Option3',
                'inputValue': '31',
                'inputName': 'item11checkbox',
                'type': 'checkbox'
            },
            {
                'checked': false,
                'label': 'Normal Option3',
                'inputValue': '32',
                'inputName': 'item22checkbox',
                'type': 'checkbox'
            },
            {
                'checked': false,
                'disabled': true,
                'label': 'Disabled Option3',
                'inputName': 'item33checkbox',
                'inputValue': '33',
                'type': 'checkbox'
            }
        ],
        'label': 'Sites',
        'inputName': 'site',
        'searchable': true,
        'type': 'group'
    },
    {
        'items': [
            {
                'active': true,
                'checked': false,
                'label': 'Selected Option4',
                'inputValue': '41',
                'inputName': 'item1211checkbox',
                'type': 'checkbox'
            },
            {
                'label': 'Normal Option4',
                'checked': false,
                'inputValue': '42',
                'inputName': 'item2122checkbox',
                'type': 'checkbox'
            },
            {
                'disabled': true,
                'checked': false,
                'label': 'Disabled Option4',
                'inputName': 'item3133checkbox',
                'inputValue': '43',
                'type': 'checkbox'
            }
        ],
        'label': 'Content Type',
        'inputName': 'contentType',
        'searchable': true,
        'type': 'group'
    },
    {
        'items': [
            {
                'active': true,
                'checked': false,
                'label': 'Selected Option',
                'inputValue': '1',
                'inputName': 'item231checkbox',
                'type': 'checkbox'
            },
            {
                'label': 'Normal Option',
                'checked': false,
                'inputValue': '2',
                'inputName': 'item312checkbox',
                'type': 'checkbox'
            },
            {
                'disabled': true,
                'checked': false,
                'label': 'Disabled Option',
                'inputName': 'item3222checkbox',
                'inputValue': '3',
                'type': 'checkbox'
            }
        ],
        'label': 'Change type',
        'inputName': 'changeType',
        'searchable': true,
        'type': 'group'
    }
]

export {
    orders,
    filterDropdownList,
};