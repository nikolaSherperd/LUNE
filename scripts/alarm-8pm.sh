#!/usr/bin/env bash
export DISPLAY="${DISPLAY:-:0}"
export WAYLAND_DISPLAY="${WAYLAND_DISPLAY:-wayland-0}"
export DBUS_SESSION_BUS_ADDRESS="${DBUS_SESSION_BUS_ADDRESS:-unix:path=/run/user/1000/bus}"

# Play alarm audio
(
  for i in {1..3}; do
    pw-play /usr/share/sounds/freedesktop/stereo/alarm-clock-elapsed.oga 2>/dev/null || canberra-gtk-play -i alarm-clock-elapsed 2>/dev/null
    sleep 0.5
  done
) &

# Show persistent critical desktop notification popup
notify-send -u critical -t 0 \
  -a "LUNE Aerospace" \
  "🚀 LUNE 8:00 PM ALARM" \
  "Time to connect LUNE's social media handles and contact info!\nRefer to: SOCIAL_AND_CONTACT_SETUP.md"
