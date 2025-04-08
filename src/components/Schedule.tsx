'use client';

import React, { useEffect, useState } from 'react';
import styles from './Schedule.module.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const timeSlots = Array.from({ length: (23 - 8) * 2 + 1 }, (_, i) => {
  const hour = 8 + Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});

function getWeekDates(startDate: Date): Date[] {
  const dates: Date[] = [];
  const day = startDate.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(startDate);
  monday.setDate(startDate.getDate() + mondayOffset);

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }
  return dates;
}

function getFormattedDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getDateKey(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function isSlotWithin(start: string, end: string, slot: string): boolean {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  const [ch, cm] = slot.split(':').map(Number);

  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;
  const slotMin = ch * 60 + cm;

  return slotMin >= startMin && slotMin < endMin;
}

function getMiddleSlot(start: string, end: string, slots: string[]): string | null {
  const startIndex = slots.indexOf(start);
  const endIndex = slots.indexOf(end);
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) return null;
  const middleIndex = Math.floor((startIndex + endIndex - 1) / 2);
  return slots[middleIndex];
}

export default function Schedule() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [unavailableBlocks, setUnavailableBlocks] = useState<{ date: string; start_time: string; end_time: string; description: string }[]>([]);

  useEffect(() => {
    fetch('/data/unavailableTimes.json')
      .then((res) => res.json())
      .then((data) => setUnavailableBlocks(data))
      .catch((err) => console.error('Failed to load unavailable times:', err));
  }, []);

  const currentWeek = getWeekDates(new Date(Date.now() + weekOffset * 7 * 24 * 60 * 60 * 1000));
  const displayWeek = `${getFormattedDate(currentWeek[0])} - ${getFormattedDate(currentWeek[6])}`;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Weekly Availability</h1>
      <div className={styles.navbar}>
        <div className={styles.weekNav}>
          <button onClick={() => setWeekOffset((prev) => prev - 1)} className={styles.arrow}>◀</button>
          <span className={styles.weekRange}>Week of {displayWeek}</span>
          <button onClick={() => setWeekOffset((prev) => prev + 1)} className={styles.arrow}>▶</button>
        </div>
        <div className={styles.legend}>
          <span className={styles.unavailableBox}></span> Unavailable
          <span className={styles.availableBox}></span> Available
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Time</th>
            {currentWeek.map((date, i) => (
              <th key={i}>
                <div>{days[i]}</div>
                <div>{getFormattedDate(date)}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot) => (
            <tr key={slot}>
              <td>{slot.endsWith(':00') ? slot : ''}</td>
              {currentWeek.map((date) => {
                const dateKey = getDateKey(date);
                const block = unavailableBlocks.find(b => b.date === dateKey && isSlotWithin(b.start_time, b.end_time, slot));
                const middleSlot = block ? getMiddleSlot(block.start_time, block.end_time, timeSlots) : null;
                const showDescription = middleSlot === slot;

                return (
                  <td key={dateKey + slot} className={block ? styles.unavailable : ''}>
                    {showDescription ? block?.description : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}