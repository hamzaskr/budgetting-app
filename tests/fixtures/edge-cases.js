export const invalidAmounts = ['0', '0.00', '-500', '.', '.50', '500.', '500.123', '1e6', 'NaN', 'Infinity', '', '  ', '١٢٣'];
export const validAmounts = ['500', '500.00', '500.5', '000500', '1,000', '1,000.50'];
export const maliciousStrings = ['<script>alert(1)</script>', '<img src=x onerror=alert(1)>', '\"><svg onload=alert(1)>', 'javascript:alert(1)'];
