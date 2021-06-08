export const normalize = (className: string) => `
.${className} {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    box-shadow: none;
    line-height: auto;
    background: transparent;
    opacity: 1;
    border-radius: 0;
    display: block;
    position: relative;
    font-weight: normal;
}
`;
