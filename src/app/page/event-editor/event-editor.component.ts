import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/model/event';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss'],
})
export class EventEditorComponent implements OnInit {
  event: Event = new Event();

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>
      this.eventService.get(params['id']).subscribe((event) => {
        this.event = event || new Event();
      })
    );
  }

  onUpdate(eventForm: NgForm): void {
    this.eventService.update(eventForm.value).subscribe((event) => {
      this.router.navigate(['/']);
    });
  }
}
