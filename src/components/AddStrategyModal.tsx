'use client';

import { useState } from 'react';
import { useStrategyStore } from '@/store/useStrategyStore';
import type { Team, Difficulty } from '@/types';
import styles from './AddStrategyModal.module.css';

interface AddStrategyModalProps {
  onClose: () => void;
}

const TEAMS: Team[] = ['T', 'CT', 'Both'];
const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export function AddStrategyModal({ onClose }: AddStrategyModalProps) {
  const { addStrategy } = useStrategyStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState<Team>('T');
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !description.trim()) return;

    addStrategy({
      name: name.trim(),
      description: description.trim(),
      team,
      difficulty,
    });

    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add Strategy</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Strategy Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Rush B No Stop"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the strategy..."
              className={styles.textarea}
              rows={3}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Team</label>
              <div className={styles.buttonGroup}>
                {TEAMS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`${styles.selectBtn} ${team === t ? styles.selected : ''}`}
                    onClick={() => setTeam(t)}
                  >
                    {t === 'Both' ? 'T / CT' : t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Difficulty</label>
            <div className={styles.buttonGroup}>
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`${styles.selectBtn} ${styles[d.toLowerCase()]} ${difficulty === d ? styles.selected : ''}`}
                  onClick={() => setDifficulty(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Strategy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

