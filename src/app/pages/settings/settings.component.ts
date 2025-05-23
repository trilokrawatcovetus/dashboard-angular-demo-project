import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  isDarkMode = false;
  profileForm: FormGroup;
  showSuccessMessage = false;

  constructor(private themeService: ThemeService, private fb: FormBuilder) {
    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      role: ['', Validators.required],
      timezone: ['', Validators.required]
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.showSuccessMessage = true;
      this.profileForm.reset();
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }
  }
}
