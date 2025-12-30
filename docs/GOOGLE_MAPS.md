# Google Maps Integration Guide

## Overview

The contact page includes Google Maps integration to display the office location
and provide easy navigation options for visitors.

## Implementation

### Current Setup

The Google Maps integration uses **Google Maps Embed API** which is:
- **Free to use** - No API key required
- **Simple iframe embed** - No JavaScript needed
- **No billing** - No usage limits for basic embedding

### Location Details

- **Address**: 10355 152 St, Surrey, BC, Canada V3R 7C3
- **Embed URL**: `https://www.google.com/maps?q=10355+152+St,+Surrey,+BC+V3R+7C3&output=embed`
- **File Location**: `src/app/contact/page.tsx` (lines 683-697)

### Features Implemented

1. **Interactive Map Embed**
   - Embedded iframe showing office location
   - Responsive design (square on mobile, wide on desktop)
   - Lazy loading for performance
   - Accessible with proper title attribute

2. **Quick Navigation Links**
   - **Google Maps**: Opens location in Google Maps app/website
   - **Apple Maps**: Opens location in Apple Maps app (iOS/Mac)
   - Both links use deep linking for native app experience

3. **Location Information**
   - Nearby landmarks display
   - Address information
   - Directions and navigation options

## Code Implementation

### Map Embed

```tsx
<iframe
  src='https://www.google.com/maps?q=10355+152+St,+Surrey,+BC+V3R+7C3&output=embed'
  width='100%'
  height='100%'
  style={{ border: 0 }}
  allowFullScreen
  loading='lazy'
  referrerPolicy='no-referrer-when-downgrade'
  title='BestITConsultants Office Location - 10355 152 St, Surrey, BC'
/>
```

### Navigation Links

**Google Maps Link:**
```tsx
<a
  href='https://www.google.com/maps/search/?api=1&query=10355%20152%20St%2C%20Surrey%2C%20BC%20V3R%207C3'
  target='_blank'
  rel='noopener noreferrer'
>
  Open in Google Maps
</a>
```

**Apple Maps Link:**
```tsx
<a
  href='https://maps.apple.com/?q=10355+152+St,+Surrey,+BC+V3R+7C3'
  target='_blank'
  rel='noopener noreferrer'
>
  Open in Apple Maps
</a>
```

## API Key Requirements

### Is GOOGLE_API_KEY Needed?

**Answer: No** - The current implementation does **NOT** require a Google API key.

**Why?**
- Google Maps Embed API (iframe embed) is free and doesn't require authentication
- The embed URL format `?q=ADDRESS&output=embed` works without API keys
- Simple iframe embeds have no usage limits

**Note:** If you see `GOOGLE_API_KEY` in your `.env.local`, it might be used for
other features in the project (if any), but it's **not required** for the
contact page Google Maps integration.

### When Would You Need an API Key?

You would only need `GOOGLE_API_KEY` if you want to:
- Use Google Maps JavaScript API (custom maps, markers, directions)
- Use Google Places API (autocomplete, place details)
- Use Google Geocoding API (address to coordinates conversion)
- Use Google Directions API (route planning)
- Exceed free tier limits for advanced features

**Current Implementation**: None of these features are used, so no API key is
needed.

## Customization

### Updating the Address

To change the office location, update the address in these locations:

1. **Map Embed URL** (`src/app/contact/page.tsx` line 687):
   ```tsx
   src='https://www.google.com/maps?q=YOUR+NEW+ADDRESS&output=embed'
   ```

2. **Google Maps Link** (line 644):
   ```tsx
   href='https://www.google.com/maps/search/?api=1&query=YOUR+NEW+ADDRESS'
   ```

3. **Apple Maps Link** (line 658):
   ```tsx
   href='https://maps.apple.com/?q=YOUR+NEW+ADDRESS'
   ```

4. **Translations** (`src/lib/translations.ts`):
   - Update address in contact information
   - Update landmarks if needed

### URL Encoding

When adding addresses to URLs:
- Replace spaces with `+` or `%20`
- Encode special characters (e.g., `#` becomes `%23`)
- Example: `123 Main St, City` → `123+Main+St%2C+City`

## Styling

The map is styled with:
- Responsive aspect ratio (square on mobile, 16:9 on desktop)
- Shadow and border styling via Card component
- Full width and height within container
- Lazy loading for performance

## Troubleshooting

### Map Not Loading

1. **Check Internet Connection**
   - Map requires active internet connection
   - Embedded iframe loads from Google servers

2. **Browser Blocking**
   - Some browsers may block iframes
   - Check browser console for errors
   - Verify `referrerPolicy` is set correctly

3. **Ad Blockers**
   - Some ad blockers may block Google Maps
   - Test with ad blocker disabled

4. **CSP (Content Security Policy)**
   - Ensure `frame-src` includes `https://www.google.com`
   - Check Next.js middleware for CSP headers

### Map Not Responsive

- Verify container has proper CSS classes
- Check `aspect-square lg:aspect-video` classes
- Ensure parent container has width constraints

## Performance Considerations

- **Lazy Loading**: Map iframe uses `loading='lazy'` attribute
- **No JavaScript**: Embed doesn't require additional JS libraries
- **Caching**: Browser caches map tiles automatically
- **Minimal Impact**: Simple iframe has negligible performance impact

## Security

- **Referrer Policy**: Set to `no-referrer-when-downgrade`
- **Sandbox**: Consider adding `sandbox` attribute if needed
- **External Links**: Use `rel='noopener noreferrer'` for external links
- **HTTPS**: Always use HTTPS URLs for Google Maps

## Future Enhancements (Optional)

If you want more advanced features, you could:

1. **Add Custom Markers**
   - Would require Google Maps JavaScript API
   - Would need `GOOGLE_API_KEY`

2. **Add Directions**
   - Would require Google Directions API
   - Would need `GOOGLE_API_KEY`

3. **Add Street View**
   - Use Google Street View Static API
   - Would need `GOOGLE_API_KEY`

4. **Add Multiple Locations**
   - Show multiple office locations
   - Would require Google Maps JavaScript API

**Note**: These enhancements are optional and not currently implemented.

## References

- [Google Maps Embed API](https://developers.google.com/maps/documentation/embed)
- [Google Maps Platform Pricing](https://mapsplatform.google.com/pricing/)
- [Google Maps URLs](https://developers.google.com/maps/documentation/urls/overview)

