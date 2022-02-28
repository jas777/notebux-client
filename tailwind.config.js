function withOpacityValue(variable) {
        return `var(${variable})`
}

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        fontFamily: {
            heading: [
                'Epilogue',
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'Arial',
                'Noto Sans',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji',
            ],
            content: [
                'Roboto',
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'Arial',
                'Noto Sans',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji',
            ],
        },
        extend: {
            colors: {
                text: withOpacityValue('--color-text'),
                'text-secondary': withOpacityValue('--color-text-secondary'),
                primary: withOpacityValue('--color-primary'),
                'primary-darker': withOpacityValue('--color-primary-darker'),
                secondary: withOpacityValue('--color-secondary'),
                'secondary-darker': withOpacityValue('--color-secondary-darker'),
                tertiary: withOpacityValue('--color-tertiary'),
                'tertiary-darker': withOpacityValue('--color-tertiary-darker'),
                background: withOpacityValue('--color-background'),
                error: withOpacityValue('--color-error'),
                'field-background': withOpacityValue('--color-field-background'),
                'card-background': withOpacityValue('--color-card-background'),
                'table-primary': withOpacityValue('--color-table-primary'),
                'table-secondary': withOpacityValue('--color-table-secondary'),
                'table-hover': withOpacityValue('--color-table-hover')
            },
            maxHeight: {
                '1/2': '50%',
            },
        },
    },
    plugins: [],
}
