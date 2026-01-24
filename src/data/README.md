# Strategy Data Files

This directory contains the CSV files that define all the strategies for the CS2 Strat Roulette app.

## Files

- **`strategies.csv`** - Fixed strategies that don't use variable substitution
- **`variable-strategies.csv`** - Strategies that use variable substitution (e.g., weapon names, site names)

## Format

### strategies.csv
```csv
Name,Description,T/CT/Both,"Difficulty (Easy, Medium, Hard)"
```

### variable-strategies.csv
```csv
Name,Description,T/CT/Both,"Difficulty (Easy, Medium, Hard)","Special information (weapon, console, etc.)",Weight
```

The "Special information" column should reference one of these variable arrays:
- `sites` - ["A", "B"]
- `high_noon` - ["R8 Revolver", "Desert Eagle"]
- `snipers` - ["AWP", "SSG 08"]
- `ct_weapons` - CT-side weapons
- `t_weapons` - T-side weapons
- `weapons` - All weapons

Use `_` as a placeholder in the Name and Description that will be replaced with a random item from the variable array.

## Editing

You can edit these CSV files directly and the changes will be included in the next build. The data is bundled at build time, so there's **zero runtime performance cost** - it's as fast as hardcoded data!

## Performance

- **Build time**: CSV files are read and bundled during the Next.js build
- **Runtime**: Zero overhead - data is already in the bundle as optimized JavaScript
- **File size**: Minimal - CSV data becomes compressed JavaScript code
